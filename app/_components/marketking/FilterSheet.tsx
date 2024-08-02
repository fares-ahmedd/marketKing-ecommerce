import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaFilter } from "react-icons/fa";
import IconButton from "../ui/IconButton";
import Filter from "../ui/Filter";

function FilterSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton className="hidden max-md:flex-items-center gap-1 ">
          <FaFilter /> Filter
        </IconButton>
      </SheetTrigger>
      <SheetContent>
        <Filter isMedium={true} />
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;
