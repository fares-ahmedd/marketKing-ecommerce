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
        <IconButton className="flex-items-center gap-1 md:hidden">
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
