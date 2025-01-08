import 'dotenv/config'
import {app} from "./app";
import dbConnection from "./db/db";


dbConnection().then(() =>
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port http://localhost:${process.env.PORT}`);
    })
).catch(err => console.log(err));


// app.listen(process.env.PORT, () => {
//     console.log(`Listening on port http://localhost:${process.env.PORT}`);
// })