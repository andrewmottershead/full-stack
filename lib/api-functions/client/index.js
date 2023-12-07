export const sendEmail = (vals) => {
    console.log(vals);
    try {
        const response = fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json; charset="UTF-8"',
            },
            body: JSON.stringify(vals),
        });
        if (!response.ok) throw response;
        console.log(`Email Sent`);
        // TODO - hook up snackbar
    }   catch (err) {
        console.log(err);
    }
};