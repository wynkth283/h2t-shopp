import { useState } from "react";

export default function VariantProduct({ a, b, selected, onChange }) {
    // Kiểm tra nếu b là array của objects (có giá) hay array của strings
    const isObjectArray = b && b.length > 0 && typeof b[0] === 'object';

    return (
        <div className="flex items-start gap-4 py-4">
            <span className="w-24 text-sm font-semibold text-gray-700 pt-2 shrink-0">{a}</span>

            <div className="flex gap-3 flex-wrap">
                {b.map((item, index) => {
                const itemName = isObjectArray ? item.name : item;
                const itemPrice = isObjectArray ? item.price : null;
                const isSelected = selected === itemName;

                return (
                    <label
                    key={index}
                    className={`
                        relative flex flex-col items-center justify-center px-2 py-1 min-w-[100px]
                        cursor-pointer rounded-xl border-2 transition-all duration-200
                        ${isSelected 
                        ? "border-red-600 bg-red-50/50 shadow-sm ring-1 ring-red-600" 
                        : "border-gray-200 hover:border-red-300 hover:bg-gray-50"}
                    `}
                    >
                    <input
                        type="radio"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => onChange(itemName)}
                    />
                    
                    <span className={`text-sm font-bold ${isSelected ? "text-red-700" : "text-gray-700"}`}>
                        {itemName}
                    </span>
                    {isSelected && (
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        </div>
                    )}
                    </label>
                );
                })}
            </div>
            </div>
    );
}
