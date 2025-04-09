function DeleteModal({ onConfirm, onCancel, item = 'List' }) {
    return (
        <>
            <style>
                {`
            @keyframes fadeInScale {
                0% {
                opacity: 0;
                transform: scale(0.95);
                }
                100% {
                opacity: 1;
                transform: scale(1);
                }
            }
            `}
            </style>
            <div className="fixed inset-0 h-screen bg-black/70 z-[9999] flex flex-col items-center justify-center">
                <div
                    className="w-[90%] max-w-md p-6 bg-white text-black border border-black shadow-[6px_6px_0_0_red] flex flex-col space-y-5"
                    style={{
                        animation: 'fadeInScale 0.3s ease-out forwards',
                    }}
                >
                    <h1 className="font-heading text-2xl font-bold uppercase border-b border-black pb-2">
                        Delete This {item}?
                    </h1>
                    <p>
                        This action is irreversible. The {item} will be permanently deleted.
                        Are you sure you want to proceed?
                    </p>
                    <div className="flex flex-row gap-1">
                        <button
                            className="text-lg tracking-widest text-center bg-red-400 border-black border-1 py-2 px-3 font-specials
                hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out font-Bold"
                            onClick={onConfirm}
                        >
                            Delete
                        </button>
                        <button
                            className="text-lg tracking-widest text-center bg-green-400 border-black border-1 py-2 px-3 font-specials
                hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out font-Bold"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteModal;
