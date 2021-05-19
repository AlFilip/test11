function tabs({
    tabsSelector,
    tabsContentSelector,
    tabsParentSelector,
    activeTabSelector
}) {
    // Tabs
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabs.forEach(item => {
            if (item.classList.contains(activeTabSelector)) {
                item.classList.remove(activeTabSelector);
            }
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(activeTabSelector);
    }

    tabsParent.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains(tabsSelector.slice(1)) &&
            !e.target.classList.contains(activeTabSelector)) {
            tabs.forEach((item, i) => {
                if (e.target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
}

export default tabs;