import loaderSvg from "../../assets/bars.svg";

const Loader = () => {
    return (
        <div className="loader">
            <img src={loaderSvg} alt="Loading..." />
        </div>
    );
};

export default Loader;
