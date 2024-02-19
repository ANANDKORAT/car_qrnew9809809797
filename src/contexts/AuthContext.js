import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

const AuthContextProvide = createContext();

const useAuth = () => useContext(AuthContextProvide);

const AuthContext = ({ children }) => {
  const [singleProduct, setSingleProduct] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [whiteListProducts, setWhiteListProducts] = useState([]);
  const [addNewItem, setAddNewItem] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalMRP, setTotalMRP] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [logo, setLogo] = useState("");
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({});
  const [hideAddress, setHideAddress] = useState(false);
  const [category, setCategory] = useState({});
  const [storedTime, setStoredTime] = useState(null);

  const handleAddNewItem = (add) => {
    setAddNewItem(add);
  };
  const handleSetCartProducts = (data) => {
    setCartProducts(data);
  };
  const handleSetWhiteListProducts = (item) => {
    if (whiteListProducts?.find((o) => o._id === item._id)) {
      const selectedItem = whiteListProducts.filter((o) => o._id !== item._id);
      setWhiteListProducts(selectedItem);
    } else {
      setWhiteListProducts((prevState) => [...prevState, item]);
    }
  };

  const handleSliderData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/slider-image/get`;
    axios
      .get(url)
      .then(function (response) {
        setSliderImages(response?.data?.data?.slideImages || []);
        setLogo(response?.data?.data?.logo || []);
      })
      .catch(function (error) {
        // handle error
        console.log("---- error", error);
      });
  };

  useEffect(() => {
    handleSliderData();
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      setStoredTime(new Date().getTime());
    }
  }, [cartProducts]);

  useEffect(() => {
    if (selectedProduct.length > 0) {
      localStorage.setItem("slectedData", JSON.stringify(selectedProduct));
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (address.mobile) {
      localStorage.setItem("address", JSON.stringify(address));
    }
  }, [address]);

  useEffect(() => {
    const storageData = localStorage.getItem("cartProducts");
    const slectedData = localStorage.getItem("slectedData");
    const addressData = localStorage.getItem("address");
    if (storageData) {
      setCartProducts(JSON.parse(storageData));
    }
    if (slectedData) {
      setSelectedProduct(JSON.parse(slectedData));
    }
    if (addressData) {
      setAddress(JSON.parse(addressData));
    }
  }, []);

  const handleSelectProduct = (id) => {
    if (selectedProduct?.find((o) => o._id === id)) {
      const selectedItem = selectedProduct.filter((o) => o._id !== id);
      setSelectedProduct(selectedItem);
    } else {
      const item = cartProducts.find((o) => o._id === id);
      setSelectedProduct((prevState) => [...prevState, item]);
    }
  };

  const handlePriceData = (products) => {
    let total = 0;
    let mrp = 0;
    let discount = 0;
    for (let i = 0; i < products.length; i++) {
      total = (
        Number(total) + Number(products[i].discount * products[i].quantity)
      ).toFixed(2);
      mrp = (
        Number(mrp) + Number(products[i].price * products[i].quantity)
      ).toFixed(2);
      discount = (
        Number(discount) +
        (products[i].discount
          ? Number(products[i].price * products[i].quantity) -
            products[i].discount
          : 0)
      ).toFixed(2);
    }
    setTotalPrice(Math.round(total));
    setTotalMRP(Math.round(mrp));
    setTotalDiscount(Math.round(discount));
  };

  useEffect(() => {
    handlePriceData(selectedProduct);
  }, [selectedProduct]);

  // Function to clear local storage
  function clearLocalStorage() {
    localStorage.removeItem("cartProducts");
    localStorage.removeItem("slectedData");
    localStorage.removeItem("address");
  }
  useEffect(() => {
    // Check and clear local storage after 15 minutes
    function checkAndClearLocalStorage() {
      let currentTime = new Date().getTime();
      let elapsedTime = currentTime - storedTime;

      // If 15 minutes have passed, clear local storage
      if (elapsedTime >= 15 * 60 * 1000) {
        // 15 minutes in milliseconds
        clearLocalStorage();
      }

      // Set the timeout for the next check
      setTimeout(checkAndClearLocalStorage, 60 * 1000); // Check every minute
    }
    checkAndClearLocalStorage();
  }, [storedTime]);
  console.log(window.matchMedia("(max-width: 599px)").matches);
  return (
    <AuthContextProvide.Provider
      value={{
        cartProducts,
        handleSetCartProducts,
        addNewItem,
        handleAddNewItem,
        totalPrice,
        totalDiscount,
        totalMRP,
        selectedProduct,
        handleSelectProduct,
        setSelectedProduct,
        step,
        setStep,
        handleSetWhiteListProducts,
        whiteListProducts,
        singleProduct,
        setSingleProduct,
        address,
        setAddress,
        hideAddress,
        setHideAddress,
        sliderImages,
        logo,
        category,
        setCategory,
      }}
    >
      <Container
        className="p-0"
        style={
          {
            margin: "auto",
            maxWidth: "500px",
          }
          // window.matchMedia("(max-width: 768px)").matches
          //   ? { maxWidth: "500px" }
          //   : { maxWidth: "500px", margin: "0px auto" }
        }
      >
        {children}
      </Container>
    </AuthContextProvide.Provider>
  );
};

export { useAuth, AuthContext };
