export const toastNotificationPopover = ({ content }: { content: string }) => {
  const popover = document.createElement("div");
  popover.popover = "auto";
  popover.textContent = content;
  popover.classList.add("bg-red-500")
  popover.innerHTML
  document.body.appendChild(popover);

  popover.showPopover();

  setTimeout(() => {
    popover.hidePopover();
    popover.remove();
  }, 4000);
};
