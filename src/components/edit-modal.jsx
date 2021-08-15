import React, { useEffect } from 'react';

const getItemListing = (id) =>
    fetch("https://ecomm-service.herokuapp.com/marketplace/" + id).then((res) =>
        res.json()
    );

const patchListing = (id, data) =>
    fetch("https://ecomm-service.herokuapp.com/marketplace/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());

export const EditModal = (props) => {
    // Modal Prop
    const [modalTitle, setModalTitle] = React.useState("");
    const [modalImageUrl, setModalImageUrl] = React.useState("");
    const [modalPrice, setModalPrice] = React.useState("");
    const [modalDescription, setModalDescription] = React.useState("");
    const [modalCondition, setModalCondition] = React.useState("new");
    const [modalAvailability, setModalAvailability] = React.useState("in-stock");
    const [modalNumOfStock, setModalNumOfStock] = React.useState("");

    useEffect(() => {
        getItemListing(props._id).then((data) => {
            setModalTitle(data.title);
            setModalImageUrl(data.imageUrl);
            setModalPrice(data.price);
            setModalDescription(data.description);
            setModalCondition(data.condition);
            setModalAvailability(data.availabilty);
            setModalNumOfStock(data.numOfStock);
        })
    }, [props._id])

    return (
        <div className="h-full w-screen px-3 py-12 space-y-6 
        bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center">
            <div className="md:w-1/2">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    patchListing(props._id, {
                        title: modalTitle,
                        price: Number(modalPrice),
                        description: modalDescription,
                        imageUrl: modalImageUrl,
                        condition: modalCondition,
                        availability: modalAvailability,
                        numOfStock: Number(modalNumOfStock),
                    }).then(() => {
                        props.loadListings();
                    })
                    props.setIsEdit(!props.isEdit);
                }}>
                    <div className="
                        bg-white
                        overflow-hidden
                        shadow
                        rounded-lg
                        divide-y divide-gray-200
                        ">
                        <div className="px-4 py-5 sm:px-6 text-lg">Edit Item Listing</div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-5">
                                <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                                    <label htmlFor="listing-title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Title
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input type="text" name="listing-title" id="listing-title" required
                                            className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
                                            value={modalTitle}
                                            onChange={(e) => setModalTitle(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                                    <label htmlFor="listing-price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Price
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input type="number" name="listing-price" id="listing-price" required
                                            className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
                                            min="0"
                                            value={modalPrice}
                                            onChange={(e) => setModalPrice(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Description
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <textarea type="text" name="description" id="description" rows="3" required
                                            className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
                                            value={modalDescription}
                                            onChange={(e) => setModalDescription(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Image URL (Optional)
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input type="text" name="imageUrl" id="imageUrl"
                                            className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
                                            value={modalImageUrl}
                                            onChange={(e) => setModalImageUrl(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                                    <label htmlFor="listing-condition" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Condition
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="listing-condition" name="listing-condition" required=""
                                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                                            value={modalCondition}
                                            onChange={(e) => setModalCondition(e.target.value)}
                                        >
                                            <option value="new">New</option>
                                            <option value="used_like-new">Used (like new)</option>
                                            <option value="used_good">Used (good)</option>
                                            <option value="used_fair">Used (fair)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                                    <label htmlFor="listing-availability" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Availability
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="listing-availability" name="listing-availability" required=""
                                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                                            value={modalAvailability}
                                            onChange={(e) => setModalAvailability(e.target.value)}
                                        >
                                            <option value="in-stock">In Stock</option>
                                            <option value="single-item">Single Item</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                                    <label htmlFor="num-of-stock" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Number of Available Stock
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input type="number" name="num-of-stock" id="num-of-stock" required
                                            className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
                                            min="0"
                                            value={modalNumOfStock}
                                            onChange={(e) => setModalNumOfStock(e.target.value)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 py-3  justify-end sm:px-6">
                            <button className="
                                        inline-flex
                                        justify-center
                                        py-2
                                        px-4
                                        border border-pink-500
                                        shadow-sm
                                        text-sm
                                        font-medium
                                        rounded-md
                                        text-pink-500
                                        bg-white
                                        hover:text-pink-700
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-offset-2
                                        focus:ring-pink-500
                                        has-tooltip
                                        "
                                onClick={() => props.setIsEdit(!props.isEdit)}>
                                CANCEL
                            </button>
                            <button className="
                                        inline-flex
                                        justify-center
                                        py-2
                                        px-4
                                        border border-transparent
                                        shadow-sm
                                        text-sm
                                        font-medium
                                        rounded-md
                                        text-white
                                        bg-pink-600
                                        hover:bg-pink-700
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-offset-2
                                        focus:ring-pink-500
                                        has-tooltip
                                        "
                            >
                                SAVE
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}