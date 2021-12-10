import React from 'react'
import { useSelector } from 'react-redux'
import { selectCategoryIcon } from './categoryIconSlice';
import * as ReactIcons from "react-icons/all";

export default function CategoryIcon({ id, size, type }) {
    const {categories} = useSelector(selectCategoryIcon);
    const iconName = categories.find((icon) => icon._id === id)?.icon;
    const defaultIcon = type === "income" ? "GiReceiveMoney" : "GiPayMoney";
    const icon = React.createElement(ReactIcons[iconName ? iconName : defaultIcon]);
    return (
        <div style={{ fontSize: size }}>{icon}</div>
    )
}