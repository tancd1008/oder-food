import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-md-3 border-2 border-indigo-600">
        <div className="layers bd bgc-white p-20">
          <div className="layer w-100 mB-10">
            <h6 className="lh-1">Total Visits</h6>
          </div>
          <div className="layer w-100">
            <div className="peers ai-sb fxw-nw">
              <div className="peer peer-greed">
                <span id="sparklinedash" />
              </div>
              <div className="peer">
                <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">
                  +10%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center bg-orange-300 rounded-md">2</div>
      <div className="text-center bg-orange-300 rounded-md">3</div>
      <div className="text-center bg-orange-300 rounded-md">4</div>
    </div>
  );
};

export default Dashboard;
