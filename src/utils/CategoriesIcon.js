import React from "react";
import {
  IoFastFoodOutline,
  IoWaterOutline,
  IoAirplaneOutline,
} from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import {
  MdOutlineShoppingCart,
  MdOutlineTrain,
  MdOutlineMedicalServices,
  MdOutlineSchool,
  MdAttachMoney,
} from "react-icons/md";
import { FaFileMedical, FaMobileAlt, FaUmbrellaBeach } from "react-icons/fa";
import { BiBuildingHouse, BiLineChart } from "react-icons/bi";

export default function CategoriesIcon({ id, size }) {
  const categories = [
    {
      id: 1,
      name: "Food & Beverage",
      icon: "IoFastFoodOutline",
    },
    {
      id: 2,
      name: "Shopping",
      icon: "AiOutlineShopping",
    },
    {
      id: 3,
      name: "Grocery",
      icon: "MdOutlineShoppingCart",
    },
    {
      id: 4,
      name: "Utilities",
      icon: "IoWaterOutline",
    },
    {
      id: 5,
      name: "Transport & Automobiles",
      icon: "MdOutlineTrain",
    },
    {
      id: 6,
      name: "Insurance",
      icon: "FaFileMedical",
    },
    {
      id: 7,
      name: "Medical",
      icon: "MdOutlineMedicalServices",
    },
    {
      id: 8,
      name: "Travel",
      icon: "IoAirplaneOutline",
    },
    {
      id: 9,
      name: "Housing",
      icon: "BiBuildingHouse",
    },
    {
      id: 10,
      name: "Mobile",
      icon: "FaMobileAlt",
    },
    {
      id: 11,
      name: "Leisure",
      icon: "FaUmbrellaBeach",
    },
    {
      id: 12,
      name: "Education",
      icon: "MdOutlineSchool",
    },
    {
      id: 13,
      name: "Investment",
      icon: "BiLineChart",
    },
    {
      id: 14,
      name: "Other",
      icon: "MdAttachMoney",
    },
  ];

  const iconName = categories.find((icon) => {
    return icon.id === id;
  }).icon;
  
  return (
    <>
      {iconName === "IoFastFoodOutline" && <IoFastFoodOutline size={size}/>}
      {iconName === "AiOutlineShopping" && <AiOutlineShopping size={size}/>}
      {iconName === "MdOutlineShoppingCart" && <MdOutlineShoppingCart size={size}/>}
      {iconName === "IoWaterOutline" && <IoWaterOutline size={size}/>}
      {iconName === "MdOutlineTrain" && <MdOutlineTrain size={size}/>}
      {iconName === "FaFileMedical" && <FaFileMedical size={size}/>}
      {iconName === "MdOutlineMedicalServices" && <MdOutlineMedicalServices size={size}/>}
      {iconName === "IoAirplaneOutline" && <IoAirplaneOutline size={size}/>}
      {iconName === "BiBuildingHouse" && <BiBuildingHouse size={size}/>}
      {iconName === "FaMobileAlt" && <FaMobileAlt size={size}/>}
      {iconName === "FaUmbrellaBeach" && <FaUmbrellaBeach size={size}/>}
      {iconName === "MdOutlineSchool" && <MdOutlineSchool size={size}/>}
      {iconName === "BiLineChart" && <BiLineChart size={size}/>}
      {iconName === "MdAttachMoney" && <MdAttachMoney size={size}/>}
   </>
  );
}
