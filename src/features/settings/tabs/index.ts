export type SettingsTabDefinition<T extends string = string> = {
  id: T;
  label: string;
};

export function createSettingsTabs<T extends string>(
  tabs: SettingsTabDefinition<T>[],
) {
  return tabs;
}