import 'dotenv/config'
import {app} from "./app";

app.get("/",(req,res)=>{
    console.log(req.cookies);

    res.cookie("test", "1234545", {
        httpOnly: true,
        secure: false,
        sameSite:  "lax"
    }).status(200).send("hello world!");
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})