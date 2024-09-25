import React from "react";
function Footer(){
    return (
        <footer className="footer-bg text-white text-center py-4">
        <div className="container">
            <p>&copy; {new Date().getFullYear()} Fantastic Five. All rights reserved.</p>
            <ul className="list-inline">
                <li className="list-inline-item">
                    <a href="/about" className="text-white">About Us</a>
                </li>
                <li className="list-inline-item">
                    <a href="/services" className="text-white">Services</a>
                </li>
                <li className="list-inline-item">
                    <a href="/contact" className="text-white">Contact</a>
                </li>
                <li className="list-inline-item">
                    <a href="/privacy" className="text-white">Privacy Policy</a>
                </li>
            </ul>
            <div className="mt-3">
                <p>
                    <strong>Phone:</strong> <a href="tel:+123456789" className="text-white">+1 (234) 567-89</a>
                </p>
                <p>
                    <strong>Email:</strong> <a href="mailto:info@yourcompany.com"
                                               className="text-white">info@yourcompany.com</a>
                </p>
                <p>
                    <strong>Address:</strong> 123 Your Street, Your City, Your Country
                </p>
            </div>
        </div>
    </footer>);
}

export default Footer;