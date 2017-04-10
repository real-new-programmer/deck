import { INSIGHT_NGMODULE } from './insight.module';

export class InsightFilterStateModel {

  public filtersPinned: boolean;
  public filtersExpanded: boolean;
  public filtersHovered: boolean;
  public filtersHidden: boolean;

  static get $inject() { return ['$rootScope', '$timeout', 'collapsibleSectionStateCache']; };

  public constructor(private $rootScope: ng.IRootScopeService,
                     private $timeout: ng.ITimeoutService,
                     private collapsibleSectionStateCache: any) {
    this.filtersExpanded = !collapsibleSectionStateCache.isSet('insightFilters') || collapsibleSectionStateCache.isExpanded('insightFilters');
    this.filtersPinned = this.filtersExpanded;
    this.filtersHovered = false;
  }

  public pinFilters(shouldPin: boolean): void {
    this.filtersPinned = shouldPin;
    this.filtersExpanded = shouldPin;
    this.collapsibleSectionStateCache.setExpanded('insightFilters', shouldPin);
    this.triggerReflow();
  }

  public hoverFilters(): void {
    if (!this.filtersHovered) {
      this.filtersHovered = true;
      this.filtersExpanded = true;
      this.triggerReflow();
    }
  }

  public exitFilters(): void {
    this.filtersHovered = false;
    if (!this.filtersPinned) {
      this.filtersExpanded = false;
      this.triggerReflow();
    }
  }

  public triggerReflow(): void {
    // wait 300ms to allow animation to complete
    this.$timeout(() => this.$rootScope.$broadcast('page-reflow'), 300);
  }
}

INSIGHT_NGMODULE.service('InsightFilterStateModel', InsightFilterStateModel);
