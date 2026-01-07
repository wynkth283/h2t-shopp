export default function ProductInNavSke() {
    return (
        <div className="flex items-center justify-between hover:cursor-pointer hover:bg-gray-100 p-2">
            <div className="flex">
                <div className="skeleton w-14"></div>
                <div className="h-14 ml-2">
                    <p className="skeleton skeleton-text w-[100px] h-[20px]"></p>
                    <p className="skeleton skeleton-text mt-2 h-[20px]"></p>
                </div>
            </div>
            <div className="skeleton skeleton-text w-[20px] h-[20px]"></div>
        </div>
    );
}