import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="min-h-screen w-full gap-[20px] bg-white flex justify-center items-center flex-col">
      <h1 className="text-mainColor font-bold text-[100px]">404</h1>
      <h3 className="text-mainColor font-bold text-[50px]">
        Không tìm thấy trang
      </h3>
      <Link
        to="/"
        className="text-white bg-mainColor px-3 py-4 cursor-pointer font-bold no-underline"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
export default NotFound;
