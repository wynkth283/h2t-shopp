export default function TitleSection({children}) {
    return (
        <div className="relative flex items-center">
            <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                    <div className="w-10 h-1 bg-red-900"></div>
                    <div className="w-6 h-1 bg-red-900/40"></div>
                </div>
                <h3 className="text-lg font-black text-slate-800 tracking-widest uppercase">
                    {children}
                </h3>
            </div>
        </div>

    )
}