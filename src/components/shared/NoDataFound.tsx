'use client'

import { motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";

export default function NoDataFound () {
    return (
        <div className=" flex flex-col justify-center items-center ">
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: [-50, 50] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
                <IoSearchOutline className="text-white text-7xl font-bold" />
            </motion.div>
            <p className="text-white font-medium text-xl">No Results Found.</p>
        </div>
    )
}