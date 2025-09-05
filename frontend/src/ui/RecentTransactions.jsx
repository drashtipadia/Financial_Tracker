import { IoMdDocument } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../components/TransactionInfoCard";
import { dateConverter } from "../utils/helper";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transcation</h5>
        {onSeeMore && (
          <button className="card-btn" onClick={onSeeMore}>
            See All <LuArrowRight className="text-base" />
          </button>
        )}
      </div>
      <div className="mt-6">
        {transactions &&
          transactions.map((item) => {
            return (
              <TransactionInfoCard
                key={item._id}
                title={item.type == "expense" ? item.category : item.source}
                icon={item.icon}
                date={dateConverter(item.date)}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
                hideUpdateBtn
              />
            );
          })}
      </div>
    </div>
  );
};

export default RecentTransactions;
