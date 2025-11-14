import { Col, Row } from "antd";

const dataText =
  "Those people who develop the ability to continuously acquire new and better forms of knowledge that they can apply to their work and to their lives will be the movers and shakers in our society for the indefinite future";

export const AuthLayout = ({ children, text = dataText }) => {
  return (
    <Row>
      <Col span={24}>{children}</Col>
    </Row>
  );
};
