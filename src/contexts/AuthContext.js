import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

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
  const [totalExtraDiscount, setTotalExtraDiscount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [logo, setLogo] = useState("");
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({});
  const [hideAddress, setHideAddress] = useState(false);
  const [category, setCategory] = useState({});
  const [storedTime, setStoredTime] = useState(null);
  const [themColor, setThemColor] = useState(process.env.REACT_APP_THEAM_COLOR);
  const [isPaymentPageLoading, setIsPaymentPageLoading] = useState(false);

  const handleAddNewItem = (add) => {
    setAddNewItem(add);
  };
  const handleSetCartProducts = (data) => {
    setCartProducts(data);
    localStorage.setItem("cartProducts", JSON.stringify(data));
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
      localStorage.setItem("slectedData", JSON.stringify(selectedItem));
    } else {
      const item = cartProducts.find((o) => o._id === id);
      setSelectedProduct((prevState) => {
          const seletedData= [...prevState, item];
          localStorage.setItem("slectedData", JSON.stringify(seletedData));
          return seletedData;
      });

    }
  };

  const calcExtraDiscount = (arr, pickIndex, remainingQuantity, totalExtraDiscount) => {
    const bb = arr[pickIndex];
    if (bb?.quantity > remainingQuantity) {
      totalExtraDiscount += (bb?.discount || 0) * remainingQuantity;
      return totalExtraDiscount;
    } else {
      totalExtraDiscount += bb?.discount * bb?.quantity;
      remainingQuantity = remainingQuantity - bb?.quantity;
      if (remainingQuantity > 0) {
        return calcExtraDiscount(arr, pickIndex - 1, remainingQuantity, totalExtraDiscount);
      } else {
        return totalExtraDiscount;
      }
    }
  }

  const handlePriceData = (products) => {
    let totalPrice = 0;
    let totalMRP = 0;
    let totalDiscount = 0;
    let totalExtraDiscount = 0;

    if (process.env.REACT_APP_COUPON_APPLY === 'true') {

      let Allquantity = products.reduce((acc, cur) => acc + cur.quantity, 0);
      const qua = Array.from({ length: Allquantity }, (value, index) => index);
      const originalArray = qua;
      const groupSize = 3;
      const subArrays = [];

      for (let i = 0; i < originalArray.length; i += groupSize) {
        const group = originalArray.slice(i, i + groupSize);
        if (group.length === groupSize) {
          subArrays.push(group);
        }
      }
      const countSubArraysLength3 = subArrays.length;

      const sortArry = cartProducts.sort((a, b) => b.discount - a.discount);

      totalExtraDiscount = calcExtraDiscount(sortArry, sortArry.length - 1, countSubArraysLength3, totalExtraDiscount);
      products.forEach(product => {
        const { price, discount, quantity } = product;

        // Apply buy 2 get 1 free logic
        const totalMrpWithoutDiscount = price * quantity;
        const totalPriceDiscount = discount * quantity;

        // Update totals
        totalMRP += totalMrpWithoutDiscount;
        totalDiscount += totalMrpWithoutDiscount - totalPriceDiscount;
        totalPrice += totalPriceDiscount;
      });
      totalPrice = totalPrice - totalExtraDiscount
    } else {
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
      totalPrice = Math.round(total);
      totalMRP = Math.round(mrp);
      totalDiscount = Math.round(discount);
    }

    setTotalPrice(totalPrice);
    setTotalMRP(totalMRP);
    setTotalDiscount(totalDiscount);
    setTotalExtraDiscount(totalExtraDiscount);
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

  useEffect(() => {
    setThemColor(process.env.REACT_APP_THEAM_COLOR)
  }, [process.env.REACT_APP_THEAM_COLOR]);

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
        themColor,
        totalExtraDiscount,
        isPaymentPageLoading,
        setIsPaymentPageLoading
      }}
    >
      <Container
        className="p-0"
        style={
          {
            margin: "auto",
            maxWidth: "500px",
            "--them-color": themColor
          }
        }
      >
        {children}
      </Container>
    </AuthContextProvide.Provider>
  );
};

export { useAuth, AuthContext };
