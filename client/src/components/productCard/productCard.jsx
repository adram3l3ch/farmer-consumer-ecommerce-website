import "./styles.css";
import { SelectInput } from "../inputs";
import Button from "../button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct, removeProduct } from "../../features/cartSlice";
import noImage from "../../assets/no-image.png";
import axiosConfig from "../../axiosConfig";

const weights = ["1 KG", "2 KG", "3 KG", "4 KG", "5 KG", "6 KG", "7 KG", "8 KG", "9 KG", "10 KG"];

const validationSchema = Yup.object().shape({
	quantity: Yup.string().required("quantity is required").notOneOf(["select"], "quantity is required"),
});

const ProductCard = ({ product, cartItem, deleteProduct }) => {
	const { _id } = useSelector(state => state.user);
	const { products } = useSelector(state => state.cart);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const addToCart = formData => {
		const productInCart = products.find(p => p._id === product._id);
		if (+formData.quantity.split(" ")[0] > +product.stock) {
			toast.error("Don't have enough stock");
		} else if (
			productInCart &&
			+productInCart.quantity + +formData.quantity.split(" ")[0] > +product.stock
		) {
			toast.error("Don't have enough stock");
		} else {
			dispatch(addProduct({ ...product, quantity: formData.quantity.split(" ")[0] }));
			toast.success("Product added to cart");
		}
	};
	return (
		<div className="productCard">
			<div className="product__image">
				<Link to={`/${product._id}`}>
					<img
						src={product.image ? `http://localhost:5000/${product.image}` : noImage}
						alt={product.name}
						crossOrigin="cross-origin"
					/>
				</Link>
			</div>
			<div className="product__details">
				<div className="data">
					<h3 className="title">{product.name}</h3>
					<p className="stock">{product.stock} KG left</p>
				</div>
				<p className="price">&#8377; {product.price}</p>
				{cartItem ? (
					<>
						<Button label={product.quantity + " KG"} size={1} disabled />
						<Button
							label="Delete"
							size={1}
							onClick={() => {
								dispatch(removeProduct(product));
							}}
						/>
					</>
				) : product.createdBy === _id ? (
					<>
						<Button
							label="Edit Product"
							size={1}
							onClick={() => {
								navigate(`/edit/${product._id}`);
							}}
						/>
						<Button
							label="Delete Product"
							size={1}
							onClick={() => {
								axiosConfig.delete("/products/" + product._id);
								deleteProduct(product._id);
							}}
						/>
					</>
				) : (
					<Formik
						initialValues={{ quantity: "select" }}
						validationSchema={validationSchema}
						onSubmit={addToCart}
					>
						{() => (
							<Form className="form">
								<SelectInput
									placeholder="Select Quantity"
									name="quantity"
									options={weights}
									size={6}
								/>
								<Button label="Add to cart" size={6} />
							</Form>
						)}
					</Formik>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
