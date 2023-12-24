import { addBasketSchema, updateBasketSchema } from "@/lib/validation/";
import {
    getBasketsQuery,
    getUserBasketQuery,
    add,
    update,
    remove,
    empty,
  } from "@/lib/api-functions/server/baskets/queries";

import Basket from "@/lib/api-functions/server/baskets/model";


const getBaskets = async (req, res) => {
    const { id } = req.params;


if (id) {
    query._id = id;
}

try {
    const Baskets = await Basket.find(query);
    res.status(200).json(Baskets);
} catch (err) {
    console.log(err);
    res.status(500).send(err);
}
};

const addBasket = async (req, res) => {
    let BasketData = { ...req.body };


    if (BasketData.avatar_url === "") {
        delete BasketData.avatar_url;
    }
    console.info(BasketData);

    try {
        BasketData = await addBasketSchema.validate(BasketData);
    } catch (err) {
        return res.status(400).json(err);
    }

    try {
        const newBasket = new Basket(BasketData);
        const result = await newBasket.save();
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


const updateBasket =  async (req, res) => {
  const { id } = req.params;
//   console.log(id);


if (!id) {
    return res.status(400).json({ message: "No id provided to update" });
}

const query = { _id: id };
let { owner, ...updates } = req.body;


try {
    updates = await addBasketSchema.validate(updates);
} catch (err) {
    return res.status(400).json(err);
}

try {
    const result = await Basket.updateOne(query, updates);
    if (result.n === 0) return res.status(404).send({ message: "Not Found" });
    return res.status(200).send({ message: "Updated" });
} catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};


 const removeBasket = async (req, res) => {
    const { id } = req.params;
    // console.log("id", id)
    
    if (!id) {
      return res.status(400).json({ message: "No id provided to delete" });
    }

    const query = {
        _id: id,
    };

    try {
        const result = await Basket.deleteOne(query);
        if (result.n === 0) return res.status(404).send({ message: "Not Found" });
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

 export { getBaskets, addBasket, updateBasket, removeBasket };