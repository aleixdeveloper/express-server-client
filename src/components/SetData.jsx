import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const SetData = () => {
  const [brand, setBrand] = useState(undefined);
  const [model, setModel] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const baseURL = "/api/cars";

  const setData = async () => {
    try {
      const payload = { brand: brand, model: model };
      const res = await axios.post(baseURL, payload);

      /*       setData(res); */
    } catch (e) {
      console.log(`error:`, e);
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2 className="mb-5">Insert Car</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Brand"
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Model"
            onChange={(e) => setModel(e.target.value)}
          />
        </Form.Group>
        {/*         <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit" onClick={setData}>
          Submit
        </Button>
      </Form>
      {/*    <form action='/api/cars' method='POST'>
      <input type="text" placeholder="brand" name="brand"  />
      <input type="text" placeholder="model" name="model" />
      <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default SetData;
