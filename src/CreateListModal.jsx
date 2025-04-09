function CreateListModal({textChange, handleCreateList}) {
    return (
        <div className="relative h-screen bg-black/70 z-[9999] flex flex-col items-center justify-center">
            <div className="w-[90%] max-w-md p-6 bg-white text-black border border-black shadow-[6px_6px_0_0_#000] flex flex-col space-y-5">
                <h1 className="font-heading text-2xl font-bold uppercase border-b border-black pb-2">
                    Create New List
                </h1>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="listName" className="font-medium uppercase tracking-wide font-heading">
                        List Name
                    </label>
                    <input
                        type="text"
                        id="listName"
                        className="font-body p-2 bg-white border border-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="e.g. TODO or Books"
                        autoComplete='off'
                        onChange={textChange}
                    />
                </div>

                <button
                    onClick={handleCreateList}
                    className="bg-black text-white font-bold py-2 px-4 border-2 border-black hover:bg-white hover:text-black transition-all">
                    Create List
                </button>
            </div>

            <a href="https://github.com/The-Wee-Lad/list-creater" target='_blank' className='fixed bottom-2 left-2 '>
                <div className='p-1 bg-gray-400 text-gray-500 rounded-sm hover:bg-black hover:text-white'>
                    created by Aditya Narayan
                </div>
            </a>

        </div>

    )
}

export default CreateListModal