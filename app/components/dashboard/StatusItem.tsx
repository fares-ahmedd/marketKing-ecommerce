import { useTranslate } from "@/app/hooks/useTranslate";

interface Props {
  title: string;
  icon: React.ReactNode;
  statusValue: string | number;
  labelNumber?: number;
  label: string;
}

function StatusItem({
  title,
  icon,
  statusValue,
  label,
  labelNumber = 0,
}: Props) {
  const { t } = useTranslate();
  return (
    <li className=" card flex flex-col justify-between ">
      <p className="flex-between">
        <span className="text-xl md:text-2xl font-bold"> {t(title)}</span>{" "}
        <span className="text-primary-color text-3xl"> {icon}</span>
      </p>
      <h3 className="title">{statusValue}</h3>
      <label className="text-second-text">
        {labelNumber || label === "basedOnChanges"
          ? t("basedOnChanges", { count: labelNumber })
          : t(label)}
      </label>
    </li>
  );
}

export default StatusItem;
