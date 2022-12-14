import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/layout";
import { login } from "./features/userSlice";
import AuthPage from "./pages/auth";
import CreateProduct from "./pages/createProduct";
import EditProduct from "./pages/createProduct/editProduct";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Cart from "./pages/cart/indes";
import { setCart } from "./features/cartSlice";
import Product from "./pages/product";

function App() {
	const dispatch = useDispatch();
	const { _id } = useSelector(state => state.user);
	useEffect(() => {
		const user = Cookies.get("user");
		const cart = Cookies.get("cart");
		user && dispatch(login(JSON.parse(user)));
		cart && dispatch(setCart(JSON.parse(cart)));
	}, [dispatch]);

	if (!_id) return <AuthPage />;
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create" element={<CreateProduct />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/edit/:id" element={<EditProduct />} />
				<Route path="/:id" element={<Product />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</Layout>
	);
}

export default App;
