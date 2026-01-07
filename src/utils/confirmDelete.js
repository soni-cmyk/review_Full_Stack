import Swal from "sweetalert2";

export const confirmDelete = async ({
  title = "Are you sure?",
  text = "This item will be permanently deleted!",
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  return result.isConfirmed;
};
