import { Col, Row } from "antd";

const dataText =
  "Those people who develop the ability to continuously acquire new and better forms of knowledge that they can apply to their work and to their lives will be the movers and shakers in our society for the indefinite future";

export const AuthLayout = ({ children, text = dataText }) => {
  return (
    <Row>
      <Col span={12}>
        <div className="relative w-full h-screen flex items-center justify-center bg-blue-600">
          <img
            src="@assets/image/sach.jpg"
            alt="Sach"
            className="absolute inset-0 w-full h-screen object-cover opacity-70"
          />
          <div className="relative h-full w-full text-white p-6 shadow-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <div className="leading-relaxed w-[30%]">
              <span className="text-3xl text-blue-200">“</span>
              <p className="text-sm">{text}</p>
              <p className="mt-4 font-semibold text-sm">Brian Tracy</p>
            </div>
          </div>
        </div>
      </Col>

      <Col span={12} className="bg-[var(--color-bg-two)]">
        {children}
      </Col>
    </Row>
  );
};
