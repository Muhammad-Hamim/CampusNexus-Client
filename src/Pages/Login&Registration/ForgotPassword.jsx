import { useForm } from "react-hook-form";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import useAuth from "../../Hooks/useAuth";

const ForgotPassword = () => {
  const { passwordResetMail, setLoginPage } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    passwordResetMail(data.email)
      .then((result) => {
        console.log(result);
        Store.addNotification({
          title: "Email sent!",
          message: "Please check your email",
          type: "success",
          insert: "top",
          isMobile: true,
          showIcon: true,
          container: "top-center",
          animationIn: ["animate__animated", "animate__bounceIn"],
          animationOut: ["animate__animated", "animate__zoomOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        Store.addNotification({
          message: error.message,
          type: "danger",
          insert: "top",
          isMobile: true,
          showIcon: true,
          container: "top-center",
          animationIn: ["animate__animated", "animate__bounceIn"],
          animationOut: ["animate__animated", "animate__zoomOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="">
        <label htmlFor="email" className="text-lg font-normal">
          Email
        </label>
        <input
          id="email"
          {...register("email", { required: true })}
          className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-2 rounded-md"
          type="email"
          placeholder="Your Email"
        />
        {errors.email?.type === "required" && (
          <p role="alert" className="text-red-400 mt-3">
            Please provide an email
          </p>
        )}
      </div>
      <div className="mt-10 pb-10">
        <button className="w-full block bg-[#ED6620] font-medium text-white border-[#ED6620] border-2 outline-none p-2 rounded-md">
          send email
        </button>
      </div>
      <div className="divider">OR</div>
      <div>
        <button
          onClick={() => setLoginPage("login")}
          className="w-full block bg-[#ED6620] font-medium text-white border-[#ED6620] border-2 outline-none p-2 rounded-md">
          Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
