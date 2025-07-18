import { MdContentCopy } from "react-icons/md";
import { HiCheck } from "react-icons/hi";
import { useState } from "react";
import { Button } from "../../../../shared/components/uikit/button";

export const CopyButton = ({textToCopy})=> {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Resetear después de 2 segundos
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={handleCopy}
        className="mx-2"
      >
        {copied ? <HiCheck className="size-4"/> :<MdContentCopy className="size-4"/>}
      </Button>
    </div>
  );
}