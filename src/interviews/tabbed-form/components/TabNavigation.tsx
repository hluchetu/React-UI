import "./TabbedForm.css";

type TabNavigationProps = {
  tabs: readonly string[];
  activeTab: number;
  onTabChange: (index: number) => void;
};



export const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange
}:TabNavigationProps) => {

  return (
    <div className="tab-navigation">
      {tabs.map((tab, index) => (
        <button
        aria-pressed={activeTab === index}
        key={tab}
        type="button"
        onClick={() => onTabChange(index)}
        >
        {tab}
      </button>
      )
      )}
    </div>
  )
}
