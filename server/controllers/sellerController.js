// import jwt from 'jsonwebtoken';

// // Login Seller : /api/seller/login

// export const sellerLogin = async (req, res) =>{
//     try {
//         const { email, password } = req.body;

//         if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
//             const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});

//             res.cookie('sellerToken', token, {
//                 httpOnly: true, 
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//                 maxAge: 7 * 24 * 60 * 60 * 1000,
//             });

//             return res.json({ success: true, message: "Logged In" });
//         }else{
//             return res.json({ success: false, message: "Invalid Credentials" });
//         }
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// // Seller isAuth : /api/seller/is-auth
// export const isSellerAuth = async (req, res)=>{
//     try {
//         return res.json({success: true})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// // Logout Seller : /api/seller/logout

// export const sellerLogout = async (req, res)=>{
//     try {
//         res.clearCookie('sellerToken', {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//         });
//         return res.json({ success: true, message: "Logged Out" })
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }


import jwt from 'jsonwebtoken';

// =========================
// LOGIN SELLER
// =========================
// POST /api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate credentials
        if (
            email === process.env.SELLER_EMAIL &&
            password === process.env.SELLER_PASSWORD
        ) {
            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.cookie('sellerToken', token, {
                httpOnly: true,

                // IMPORTANT for Render (HTTPS + cross-domain)
                secure: true,
                sameSite: 'none',

                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                success: true,
                message: "Logged In"
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid Credentials"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// CHECK SELLER AUTH
// =========================
// GET /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
    try {
        const token = req.cookies?.sellerToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email !== process.env.SELLER_EMAIL) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// LOGOUT SELLER
// =========================
// GET /api/seller/logout

export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.status(200).json({
            success: true,
            message: "Logged Out"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};