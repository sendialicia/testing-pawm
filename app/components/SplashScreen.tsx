"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SplashScreenProps {
    finishLoading: () => void;
}

const SplashScreen = ({ finishLoading }: SplashScreenProps) => {
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {  
        const timeout = setTimeout(() => setIsMounted(true), 10);
        
        const finishTimeout = setTimeout(() => {
            finishLoading();
        }, 8000);
        
        return () => {
            clearTimeout(timeout);
            clearTimeout(finishTimeout);
        };
    }, []);

    return (
        <motion.div className="flex h-screen items-center justify-center overflow-hidden relative"
            initial={{ backgroundColor: "#FF4E05"}}
            animate={{ backgroundColor: "#FFF8E7"}}
            transition={{
                duration: 0.1,
                delay:5,
                ease: "easeInOut"
            }}
        >
            <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -74.897, x:-600, y:-300}}
                animate={{ 
                    scale: [0, 1, 1, 0],         
                    opacity: [0, 1, 1, 0],   
                    rotate: -74.897, 
                    x: [-600, -400, -400, -800],
                    y: [-300, -200, -200, -500] 
                }}
                transition={{ 
                    duration: 5,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeOut"
                }}
                style={{
                    position: "absolute",
                    width: "899.812px",
                    height: "621.047px",
                    borderRadius: "300px",
                    background: "linear-gradient(270deg, #FFF 0%, #FF4E05 79.33%)",
                    zIndex: 3
                }}
            />

            <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -74.897, x:600, y:300}}
                animate={{ 
                    scale: [0, 1, 1, 0],           
                    opacity: [0, 1, 1, 0],        
                    rotate: -74.897, 
                    x: [600, 400, 400, 800],      
                    y: [300, 200, 200, 500]        
                }}
                transition={{ 
                    duration: 5,
                    times: [0, 0.3, 0.7, 1],       
                    ease: "easeOut"
                }}
                style={{
                    position: "absolute",
                    width: "899.812px",
                    height: "621.047px",
                    borderRadius: "300px",
                    background: "linear-gradient(270deg, #FFF 0%, #FF4E05 79.33%)",
                    zIndex: 2
                }}
            />
            <motion.div
                initial={{ scale: 0, opacity: 0}}
                animate={{ 
                    scale: [0, 1.5, 1.5, 0],      
                    opacity: [0, 1, 1, 0],         
                    rotate: [0, 360, 360, 360]     
                }}
                transition={{ 
                    duration: 5,
                    times: [0, 0.4, 0.6, 1],       
                    ease: "easeOut"
                }}
                style={{
                    position:"absolute",
                    zIndex: 4
                }}
            >
                <Image 
                    src="/Logo.png" 
                    alt="Logo" 
                    width={120} 
                    height={120}
                />
            </motion.div>

            <motion.div
                initial={{ scale: 0, opacity: 0}}
                animate={{ 
                    scale: 1.5,
                    opacity: 1,   
                }}
                transition={{ 
                    duration: 2,
                    delay: 5,
                    ease: "easeOut"
                }}
                style={{
                    position:"absolute",
                    zIndex: 5
                }}
            >
                <Image 
                    src="/LogoHitam.png" 
                    alt="Logo" 
                    width={120} 
                    height={120}
                />
            </motion.div>

        </motion.div>
    );
};

export default SplashScreen;