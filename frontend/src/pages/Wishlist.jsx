import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FiChevronDown,
    FiChevronUp,
    FiGrid,
    FiList,
    FiMoreVertical,
    FiPlus,
    FiSearch,
    FiShare2,
    FiTrash2,
    FiUpload,
    FiUser
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [addingProductId, setAddingProductId] = useState(null);

    const token = localStorage.getItem("token");

    const headers = useMemo(
        () => ({
            Authorization: `Bearer ${token}`
        }),
        [token]
    );

    const getWishlist = useCallback(async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const res = await axios.get("http://localhost:5000/wishlist", {
                headers
            });

            setWishlist(res.data.data || []);
        } catch (error) {
            console.log(error);
            setErrorMessage("We could not load your wishlist right now.");
        } finally {
            setLoading(false);
        }
    }, [headers]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getWishlist();
    }, [getWishlist, navigate, token]);

    const removeWishlist = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/wishlist/remove/${id}`, {
                headers
            });

            setWishlist((items) => items.filter((item) => item.wishlist_id !== id));
        } catch (error) {
            console.log(error);
            setErrorMessage("We could not remove this item. Please try again.");
        }
    };

    const addToCart = async (productId) => {
        setAddingProductId(productId);
        setErrorMessage("");

        try {
            await axios.post(
                "http://localhost:5000/cart/add",
                {
                    product_id: productId,
                    quantity: 1
                },
                {
                    headers
                }
            );
        } catch (error) {
            console.log(error);
            setErrorMessage("We could not add this item to cart. Please try again.");
        } finally {
            setAddingProductId(null);
        }
    };

    const formatPrice = (value) =>
        Number(value || 0).toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });

    return (
        <div className="min-h-screen bg-white text-[#0F1111]">
            <div className="mx-auto w-full max-w-[1660px] px-[clamp(18px,6.7vw,128px)] py-[clamp(8px,1.2vw,18px)]">
                <div className="flex min-w-0 items-end justify-between pt-4">
                    <div className="flex min-w-0 items-end gap-[clamp(18px,2.5vw,36px)]">
                        <button className="border-b-4 border-[#2162A1] pb-3 text-[clamp(17px,1.6vw,28px)] font-semibold leading-none text-[#2162A1]">
                            Your Lists
                        </button>
                        <button className="pb-3 text-[clamp(17px,1.6vw,28px)] leading-none text-black">
                            Your Friends
                        </button>
                    </div>
                    <button className="hidden pb-4 text-[14px] text-[#0066C0] hover:text-[#C45500] hover:underline sm:block">
                        Create a List
                    </button>
                </div>

                <div className="grid min-h-[68vh] grid-cols-1 border border-[#9A9A9A] bg-white lg:grid-cols-[clamp(255px,19vw,290px)_minmax(0,1fr)]">
                    <aside className="border-b border-[#E7E7E7] p-[clamp(14px,1.25vw,22px)] lg:border-b-0">
                        <button className="flex min-h-[60px] w-full items-start justify-between bg-[#EEF0F0] px-3 py-3.5 text-left sm:max-w-[284px]">
                            <span>
                                <span className="block text-[14px] font-bold leading-tight">
                                    Shopping List
                                </span>
                                <span className="mt-2 block text-[12px] text-[#565959]">
                                    Default List
                                </span>
                            </span>
                            <span className="text-[11px] leading-tight">Private</span>
                        </button>
                        <button className="mt-4 text-[14px] text-[#0066C0] hover:text-[#C45500] hover:underline sm:hidden">
                            Create a List
                        </button>
                    </aside>

                    <main className="min-w-0 p-[clamp(14px,1.2vw,20px)]">
                        <section className="border-b border-[#D5D9D9] pb-3">
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-baseline gap-3">
                                        <h1 className="text-[clamp(17px,1.35vw,21px)] font-bold leading-tight">
                                            Shopping List
                                        </h1>
                                        <span className="text-[13px] text-[#565959]">
                                            Private
                                        </span>
                                    </div>

                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B8C4C4] text-white">
                                            <FiUser size={21} />
                                        </span>
                                        <button className="inline-flex min-h-8 items-center justify-center gap-2 rounded-full border border-[#D5D9D9] bg-white px-3 text-[14px] text-[#005EB8] hover:bg-[#F7FAFA]">
                                            <FiPlus size={19} />
                                            Invite
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <button className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#879596] bg-white px-4 text-[14px] hover:bg-[#F7FAFA]">
                                        Add item
                                    </button>
                                    <button
                                        className="inline-flex min-h-9 min-w-11 items-center justify-center rounded-full border border-[#879596] bg-white text-[16px] hover:bg-[#F7FAFA]"
                                        aria-label="Share list"
                                    >
                                        <FiUpload />
                                    </button>
                                    <button
                                        className="inline-flex min-h-9 min-w-11 items-center justify-center rounded-full border border-[#879596] bg-white text-[16px] hover:bg-[#F7FAFA]"
                                        aria-label="More list actions"
                                    >
                                        <FiMoreVertical />
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="flex flex-col gap-3 py-4 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex items-end gap-3 text-[16px]">
                                <button className="border-b-2 border-transparent pb-2 text-[#3A3A3A]">
                                    <FiGrid />
                                </button>
                                <button className="border-b-2 border-[#FF9900] pb-2 text-[#3A3A3A]">
                                    <FiList />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(200px,260px)_auto_auto] xl:grid-cols-[minmax(180px,20px)_auto_auto]">
                                <div className="flex min-h-9 items-center rounded-lg border border-[#879596] bg-white px-3 focus-within:ring-2 focus-within:ring-[#FF9900]">
                                    <FiSearch className="shrink-0 text-[18px] text-[#111] font-extrabold" />
                                    <input
                                        className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-[14px] outline-none"
                                        placeholder="Search this list"
                                        type="search"
                                    />
                                </div>
                                <button className="inline-flex min-h-9 items-center justify-between gap-2 rounded-lg border border-[#879596] bg-white px-3 text-[14px] hover:bg-[#F7FAFA]">
                                    <span>
                                        Show: <span className="font-medium">Unpurchased</span>
                                    </span>
                                    <FiChevronDown />
                                </button>
                                <button className="inline-flex min-h-9 items-center justify-between gap-2 rounded-lg border border-[#879596] bg-white px-3 text-[14px] hover:bg-[#F7FAFA]">
                                    <span>
                                        Sort by: <span className="font-medium">Most recently added</span>
                                    </span>
                                    <FiChevronDown />
                                </button>
                            </div>
                        </section>

                        {errorMessage && (
                            <div className="mb-4 border border-[#FCD200] bg-[#FFF8E6] px-4 py-3 text-[14px]">
                                {errorMessage}
                            </div>
                        )}

                        {loading ? (
                            <div className="space-y-4">
                                <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
                                <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
                            </div>
                        ) : wishlist.length === 0 ? (
                            <div className="rounded-lg border border-[#E7E7E7] p-[clamp(22px,3vw,44px)]">
                                <h2 className="text-[clamp(22px,2vw,32px)] font-medium">
                                    Your Shopping List is empty.
                                </h2>
                                <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#565959]">
                                    Add items from product pages and they will appear here for later.
                                </p>
                                <button
                                    onClick={() => navigate("/")}
                                    className="mt-5 rounded-full bg-[#FFD814] px-6 py-2 text-[15px] text-[#0F1111] hover:bg-[#F7CA00]"
                                >
                                    Continue shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {wishlist.map((item, index) => (
                                    <article
                                        key={item.wishlist_id}
                                    className="grid overflow-hidden rounded-lg border border-[#E7E7E7] bg-white md:grid-cols-[minmax(170px,205px)_minmax(0,1fr)]"
                                    >
                                        <button
                                            onClick={() => navigate(`/product/${item.product_id}`)}
                                            className="relative flex min-h-[210px] items-center justify-center bg-[#F7F7F7] p-4 md:min-h-[262px]"
                                            aria-label={`View ${item.product_name || "wishlist product"}`}
                                        >
                                            {index === 0 && (
                                                <span className="absolute left-0 top-0 bg-[#565959] px-3 py-1 text-[12px] font-bold text-white">
                                                    In Cart
                                                </span>
                                            )}
                                            <img
                                                src={item.image_url}
                                                alt={item.product_name || "Wishlist product"}
                                                className="max-h-[188px] max-w-full object-contain"
                                            />
                                        </button>

                                        <div className="grid min-w-0 grid-cols-1 p-[clamp(12px,1.1vw,16px)] lg:grid-cols-[minmax(0,1fr)_28px]">
                                            <div className="min-w-0">
                                                <button
                                                    onClick={() => navigate(`/product/${item.product_id}`)}
                                                    className="line-clamp-2 text-left text-[clamp(14px,1vw,16px)] font-bold leading-snug text-[#0B57A3] hover:text-[#C45500] hover:underline"
                                                >
                                                    {item.product_name || item.description || "Wishlist item"}
                                                </button>

                                                <p className="mt-1 line-clamp-1 text-[14px] leading-tight text-black">
                                                    by {item.brand || "Amazon"} (Unknown Binding)
                                                </p>

                                                <div className="mt-2 flex flex-wrap items-center gap-1 text-[13px] leading-none">
                                                    <span className="flex items-center gap-0.5 text-[#FFA41C]">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <FaStar key={star} />
                                                        ))}
                                                    </span>
                                                    <FiChevronDown className="text-[#111]" />
                                                    <span className="text-[#0066C0]">
                                                        {item.reviews || item.rating || 0}
                                                    </span>
                                                </div>

                                                <p className="mt-2 text-[17px] leading-tight">
                                                    {"\u20B9"}{formatPrice(item.price)}
                                                    <span className="ml-1 rounded-sm bg-[#3A4553] px-1 py-0.5 text-[11px] font-bold text-white">
                                                        a
                                                    </span>
                                                    <span className="ml-1 text-[13px] font-bold">
                                                        Fulfilled
                                                    </span>
                                                    <span className="ml-1 text-[13px] font-bold">
                                                        FREE Delivery.
                                                    </span>
                                                    <span className="ml-1 text-[13px] text-[#0066C0]">
                                                        Details
                                                    </span>
                                                </p>

                                                {item.mrp && (
                                                    <p className="mt-1 text-[13px] leading-tight">
                                                        <span className="font-bold">Price dropped 5%</span>
                                                        <span className="ml-2">
                                                            (was {"\u20B9"}{formatPrice(item.mrp)} when added to Wish List)
                                                        </span>
                                                    </p>
                                                )}

                                                <p className="mt-1 line-clamp-1 text-[13px] leading-tight">
                                                    Colour : Brown
                                                </p>

                                                <p className="mt-8 text-[14px] text-black md:mt-9">
                                                    Item added 30 June 2026
                                                </p>

                                                <div className="mt-6 flex flex-wrap items-center gap-2">
                                                    <button
                                                        onClick={() => addToCart(item.product_id)}
                                                        className="inline-flex min-h-9 items-center justify-center rounded-full bg-[#FFD814] px-5 text-[14px] text-[#0F1111] hover:bg-[#F7CA00] disabled:opacity-70"
                                                        disabled={addingProductId === item.product_id}
                                                    >
                                                        {addingProductId === item.product_id
                                                            ? "Adding..."
                                                            : "Add to Cart"}
                                                    </button>
                                                    <button className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#879596] bg-white px-4 text-[14px] hover:bg-[#F7FAFA]">
                                                        Add a note
                                                    </button>
                                                    <button className="inline-flex min-h-9 items-center justify-center gap-1 rounded-full border border-[#879596] bg-white px-4 text-[14px] hover:bg-[#F7FAFA]">
                                                        Move
                                                        <FiChevronDown />
                                                    </button>
                                                    <button
                                                        className="inline-flex min-h-9 min-w-11 items-center justify-center rounded-full border border-[#879596] bg-white text-[16px] hover:bg-[#F7FAFA]"
                                                        aria-label="Share item"
                                                    >
                                                        <FiShare2 />
                                                    </button>
                                                    <button
                                                        onClick={() => removeWishlist(item.wishlist_id)}
                                                        className="inline-flex min-h-9 min-w-11 items-center justify-center rounded-full border border-[#879596] bg-white text-[18px] hover:bg-[#F7FAFA]"
                                                        aria-label="Delete item"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4 hidden flex-col items-center justify-center gap-1 text-[18px] lg:flex">
                                                <FiChevronUp />
                                                <FiChevronDown />
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {!loading && wishlist.length > 0 && (
                            <div className="py-5 text-center text-[14px] text-[#565959]">
                                End of list
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
