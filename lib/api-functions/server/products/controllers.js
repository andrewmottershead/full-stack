import { addProductSchema, updateProductSchema } from "@/lib/validation/";
import {
    fetchProduct,
    fetchProducts,
    add,
    update,
    remove,
  } from "@/lib/api-functions/server/products/queries";

import Product from "@/lib/api-functions/server/products/model";


const getProducts = async (req, res) => {
    const { id } = req.params;


if (process.env.NODE_ENV === "production") {
    res.setHeader("Cache-Control", "s-maxage=10,  stale-while-revalidate");
}

if (id) {
    query._id = id;
}

try {
    const products = await Product.find(query);
    res.status(200).json(products);
} catch (err) {
    console.log(err);
    res.status(500).send(err);
}
};

const addProduct = async (req, res) => {
    let productData = { ...req.body };


    if (productData.avatar_url === "") {
        delete productData.avatar_url;
    }
    console.info(productData);

    try {
        productData = await addProductSchema.validate(productData);
    } catch (err) {
        return res.status(400).json(err);
    }

    try {
        const newProduct = new Product(productData);
        const result = await newProduct.save();
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


const updateProduct =  async (req, res) => {
  const { id } = req.params;
//   console.log(id);


if (!id) {
    return res.status(400).json({ message: "No id provided to update" });
}

const query = { _id: id };
let { owner, ...updates } = req.body;


try {
    updates = await addProductSchema.validate(updates);
} catch (err) {
    return res.status(400).json(err);
}

try {
    const result = await Product.updateOne(query, updates);
    if (result.n === 0) return res.status(404).send({ message: "Not Found" });
    return res.status(200).send({ message: "Updated" });
} catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};


 const removeProduct = async (req, res) => {
    const { id } = req.params;
    // console.log("id", id)
    
    if (!id) {
      return res.status(400).json({ message: "No id provided to delete" });
    }

    const query = {
        _id: id,
    };

    try {
        const result = await Product.deleteOne(query);
        if (result.n === 0) return res.status(404).send({ message: "Not Found" });
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

 export { getProducts, addProduct, updateProduct, removeProduct };