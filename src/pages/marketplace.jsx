import * as React from "react";
import { ListingItem } from "../components/listing-item";
import { EditModal } from "../components/edit-modal";

const getListings = () =>
  fetch("https://ecomm-service.herokuapp.com/marketplace").then((res) =>
    res.json()
  );

const createListing = (data) =>
  fetch("https://ecomm-service.herokuapp.com/marketplace", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());


const usePersistedState = (storageKey, defaultValue) => {
  const [value, setValue] = React.useState(
    () => sessionStorage.getItem(storageKey) || defaultValue
  );

  React.useEffect(() => {
    sessionStorage.setItem(storageKey, value);
  }, [value, storageKey]);

  return [value, setValue];
};

export const Marketplace = () => {
  const [listings, setListings] = React.useState(undefined);

  const loadListings = () => getListings().then((data) => setListings(data));

  const [_id, set_id] = usePersistedState("_id", "");
  const [title, setTitle] = usePersistedState("title", "");
  const [imageUrl, setImageUrl] = usePersistedState("imageUrl", "");
  const [price, setPrice] = usePersistedState("price", "");
  const [description, setDescription] = usePersistedState("description", "");
  const [condition, setCondition] = usePersistedState("condition", "new");
  const [availability, setAvailability] = usePersistedState(
    "availability",
    "in-stock"
  );
  const [numOfStock, setNumOfStock] = usePersistedState("numOfStock", "");
  const [isEdit, setIsEdit] = usePersistedState("isEdit", false);

  const titleInputRef = React.useRef();

  React.useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <main className="bg-gray-50 lg:flex">
        <div className="flex-1">
          <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center mb-12">
              <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
                Marketplace
              </h1>
            </div>
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
              {listings &&
                listings.map((item) => (
                  <ListingItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    availableStock={item.numOfStock}
                    onlyOne={item.availability === "single-item"}
                    key={item._id}
                    _id={item._id}
                    loadListings={loadListings}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    set_id={set_id}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="
          flex-initial
          bg-white
          w-full
          lg:max-w-md
          border-b border-gray-100
        ">
          <form className="flex flex-col h-full"
            onSubmit={(ev) => {
              ev.preventDefault();
              createListing({
                title,
                price: Number(price),
                description,
                imageUrl,
                condition,
                availability,
                numOfStock: Number(numOfStock),
              }).then(() => {
                loadListings();
                setTitle("");
                setPrice("");
                setDescription("");
                setImageUrl("");
                setCondition("new");
                setAvailability("in-stock");
                setNumOfStock("");

                if (titleInputRef.current) {
                  titleInputRef.current.focus();
                }
              });
            }}>
            <div className="py-6 px-4 bg-pink-700 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">New Listing</h2>
              </div>
              <div className="mt-1">
                <p className="text-sm text-pink-300">
                  Get started by filling in the information below to create your new listing.
                </p>
              </div>
            </div>
            <div className="px-4 sm:px-6 pb-12">
              <div className="space-y-6 pt-6 pb-5">
                <div>
                  <label htmlFor="listing-title" className="block text-sm font-medium text-gray-900">
                    Title
                  </label>
                  <div className="mt-1">
                    <input type="text" name="listing-title" id="listing-title" required className="
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      focus:ring-pink-500 focus:border-pink-500
                      border-gray-300
                      rounded-md
                    "
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      ref={titleInputRef} />
                  </div>
                </div>
                <div>
                  <label htmlFor="listing-price" className="block text-sm font-medium text-gray-900">
                    Price
                  </label>
                  <div className="mt-1">
                    <input type="number" name="listing-price" id="listing-price" required className="
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      focus:ring-pink-500 focus:border-pink-500
                      border-gray-300
                      rounded-md
                    "
                      value={price}
                      onChange={(e) => setPrice(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea id="description" name="description" rows="3" required className="
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      focus:ring-pink-500 focus:border-pink-500
                      border border-gray-300
                      rounded-md
                    "
                      value={description}
                      onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900">
                    Image URL (Optional)
                  </label>
                  <div className="mt-1">
                    <input type="text" name="imageUrl" id="imageUrl" className="
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      focus:ring-pink-500 focus:border-pink-500
                      border-gray-300
                      rounded-md
                    "
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label htmlFor="listing-condition" className="block text-sm font-medium text-gray-900">
                    Condition
                  </label>
                  <div className="mt-1">
                    <select id="listing-condition" name="listing-condition" required className="
                      block
                      w-full
                      pl-3
                      pr-10
                      py-2
                      text-base
                      border-gray-300
                      focus:outline-none
                      focus:ring-pink-500
                      focus:border-pink-500
                      sm:text-sm
                      rounded-md
                    "
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}>
                      <option value="new">New</option>
                      <option value="used_like-new">Used (like new)</option>
                      <option value="used_good">Used (good)</option>
                      <option value="used_fair">Used (fair)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="listing-availability" className="block text-sm font-medium text-gray-900">
                    Availability
                  </label>
                  <div className="mt-1">
                    <select id="listing-availability" name="listing-availability" required className="
                      block
                      w-full
                      pl-3
                      pr-10
                      py-2
                      text-base
                      border-gray-300
                      focus:outline-none
                      focus:ring-pink-500
                      focus:border-pink-500
                      sm:text-sm
                      rounded-md
                    "
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}>
                      <option value="in-stock">In Stock</option>
                      <option value="single-item">Single Item</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="num-of-stock" className="block text-sm font-medium text-gray-900">
                    Number of Available Stock
                  </label>
                  <div className="mt-1">
                    <input type="number" name="num-of-stock" id="num-of-stock" required className="
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      focus:ring-pink-500 focus:border-pink-500
                      border-gray-300
                      rounded-md
                    "
                      value={numOfStock}
                      onChange={(e) => setNumOfStock(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="
              flex-shrink-0
              px-4
              py-4
              flex
              justify-end
              border-t border-gray-200
            ">
              <button type="submit" className="
                ml-4
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
              ">
                ADD
              </button>
            </div>
          </form>
        </div>
      </main>
      {isEdit && <EditModal isEdit={isEdit} setIsEdit={setIsEdit} _id={_id}  loadListings={loadListings}/>}
    </>
  )
}