import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Table, Button, Form } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import "./GetData.css";

const GetData = () => {
  const [data, setData] = useState(undefined);
  const [cars, setCars] = useState(undefined);
  const [editableRow, setEditableRow] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const baseURL = "/api/cars";

  useEffect(() => {
    getData(true);
  }, []);

  const getData = async (load) => {
    load && setLoading(true);

    try {
      const res = await axios.get(baseURL);
      const result = res.data.cars.map((el) => ({ ...el, editable: true }));
      setCars(result);
    } catch (e) {
      console.log(`error:`, e);
    }

    load && setLoading(false);
  };

  const handleEditableRow = (id) => {
    let newData = [...cars];
    const indx = newData.findIndex((el) => el._id === id);

    newData[indx].editable = !newData[indx].editable;

    console.log(`newData`, newData);
    setCars(newData);
    /*  setCars(newData); */
  };

  const handleChange = (target, value, id) => {
    let newData = [...cars];
    const indx = newData.findIndex((el) => el._id === id);

    if (target === "brand") {
      newData[indx].brand = value;
    } else {
      newData[indx].model = value;
    }
    setCars(newData);
  };

  const handleRemove = async (id) => {
    /*     let newData = [...cars];
    const brand = newData.find((el) => el._id === id).brand;
 */
    try {
      await axios.delete(`${baseURL}/${id}`);
    } catch (e) {
      console.log(`error:`, e);
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : cars && cars.length > 0 ? (
    <div style={{ width: "60%" }}>
      <h2 className="mb-5">Get Cars</h2>
      <Table variant="dark" striped borderless hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Brand</th>
            <th>Model</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars.map((el, i) => (
            <tr key={el._id}>
              <td>{i + 1}</td>
              <td>
                <Form variant="primary">
                  <Form.Control
                    color="dark"
                    type="text"
                    className="text-center"
                    style={
                      el.editable
                        ? {
                            color: "rgb(230, 230, 230)",
                            backgroundColor: "transparent",
                            border: "none",
                          }
                        : {
                            color: "white",
                            backgroundColor: "rgb(23, 27, 31)",
                            border: "1px solid lightgray",
                          }
                    }
                    value={el.brand}
                    onChange={(e) =>
                      handleChange("brand", e.target.value, el._id)
                    }
                    readOnly={el.editable}
                  />
                </Form>
              </td>
              <td>
                <Form variant="primary">
                  <Form.Control
                    color="dark"
                    type="text"
                    className="text-center"
                    style={
                      el.editable
                        ? {
                            color: "rgb(230, 230, 230)",
                            backgroundColor: "transparent",
                            border: "none",
                          }
                        : {
                            color: "white",
                            backgroundColor: "rgb(23, 27, 31)",
                            border: "1px solid lightgray",
                          }
                    }
                    value={el.model}
                    onChange={(e) =>
                      handleChange("model", e.target.value, el._id)
                    }
                    readOnly={el.editable}
                  />
                </Form>
              </td>
              <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                <BsPencilSquare
                  color="#61DAFB"
                  onClick={() => handleEditableRow(el._id)}
                />
                <BsTrash color="#F97561" onClick={() => handleRemove(el._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="info"
        type={"submit"} /* type="submit" onClick={setData} */
      >
        Guardar
      </Button>
    </div>
  ) : (
    <p>No data</p>
  );
};

export default GetData;
