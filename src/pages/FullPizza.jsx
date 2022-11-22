import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const FullPizza = () => {
  const [data, setData] = React.useState();
  const params = useParams(); // Получим параметры, в том числе Id из адресной строки
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await axios.get(
          "https://6363b07f8a3337d9a2e4920d.mockapi.io/items/" + params.id
        );
        setData(response.data);
      } catch (error) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    }

    fetchPizza();
  }, []);
  console.log(params);

  if (!data) {
    return "";
  }

  return (
    <div className="container">
      <img src={data.imageUrl} />
      <h2>{data.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quae
        eius dignissimos fugit doloremque ullam itaque quo qui perspiciatis. Ab
        assumenda delectus, sapiente deleniti distinctio optio doloribus!
        Aliquid, quo vel.
      </p>
      <h4>{data.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
