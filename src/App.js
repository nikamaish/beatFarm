import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main'; 
import Cart from './components/Cart';
import History from './components/History'; 
import Contact from './components/Contact'; 
import ArtistSignUp from './components/ArtistSignup';
import ArtistLogin from './components/ArtistLogin';
import UserProfile from './components/UserProfile';
import AdminSignIn from './admin/AdminSignIn';
import Dashboard from './admin/Dashboard';
import Plans from './admin/Plans';

function App() {
    const [cart, setCart] = useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    const handleAddToCart = (beat) => {
        setCart((prevCart) => [...prevCart, beat]);
        console.log(`${beat.trackName} added to cart!`);
    };

    const handleRemoveFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
        console.log(`Removed item with id ${id} from cart.`);
    };

    const handlePurchase = (item) => {
        setPurchaseHistory((prevHistory) => [...prevHistory, item]);
        handleRemoveFromCart(item.id); // Remove item from cart after purchase
    };

    return (
        // <Router>
            <div className="bg-light-brown min-h-screen flex flex-col">
                
                <Header cartCount={cart.length}/>


                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Main onAddToCart={handleAddToCart} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/userprofile" element={<UserProfile/>}/>
                        <Route path='/artistsignup' element={<ArtistSignUp/>}/>
                        <Route path='/artistlogin' element={<ArtistLogin/>}/>
                        <Route path="/cart" element={<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} onPurchase={handlePurchase} />} />
                        <Route path="/history" element={<History purchaseHistory={purchaseHistory} />} /> {/* Pass purchase history */}
                        <Route path ="/contact" element={<Contact />} />   
                        <Route path="/admin/sigin" element={<AdminSignIn />} />
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/plans" element={<Plans />} />
                    </Routes>
                </main>


                <Footer />
            </div>
        // </Router>
    );
}

export default App;
