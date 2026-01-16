import react from "react";
import BannerList from "./banner/BannerList";
import AdminTopbar from "../../components/admin/AdminTopbar";
import AddEditBanner from "./banner/AddEditBanner";
export default function BannerUpload() {
  const [addBanner, setAddBanner] = react.useState(false);
  const [editBannerId, setEditBannerId] = react.useState(null);
  const [singleBannerData, setSingleBannerData] = react.useState({});
  react.useEffect(() => {}, []);

  return (
    <div>
      <AdminTopbar title={"Banner Upload"} />
      {addBanner || editBannerId ? (
        <AddEditBanner
          addBanner={addBanner}
          setAddBanner={setAddBanner}
          editBannerId={editBannerId}
          setEditBannerId={setEditBannerId}
          singleBannerData={singleBannerData}
          setSingleBannerData={setSingleBannerData}
        />
      ) : (
        <BannerList
          addBanner={addBanner}
          setAddBanner={setAddBanner}
          setEditBannerId={setEditBannerId}
          singleBannerData={singleBannerData}
          setSingleBannerData={setSingleBannerData}
        />
      )}
    </div>
  );
}
