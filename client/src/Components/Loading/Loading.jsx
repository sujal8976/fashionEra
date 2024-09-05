import "./Loading.css";

export default function Loading() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="spinner-container">
          <div className="spinner">
            <div className="spinner">
              <div className="spinner">
                <div className="spinner">
                  <div className="spinner">
                    <div className="spinner"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
