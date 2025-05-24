import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { getAllDataAnalyticsRoute } from './get-all-data-analytics-route'
import { getAnalytics } from './get-analytics'
import { getAreaStatsRoute } from './get-area-stats-route'
import { getAreaSummaryRoute } from './get-area-summary-route'
import { getGeometryRoute } from './get-geometry-route'
import { getHistogramAverageHistoryRoute } from './get-histogram-history-route'
import { getLastAnalyticsRoute } from './get-last-analytics-route'
import { getNvdiStatsRoute } from './get-nvdi-stats-route'
import { getNvdiSummaryRoute } from './get-nvdi-summary-route'
import { getStatsOverviewRoute } from './get-overview-route'
import { saveAnalyticsRoute } from './save-analytics-route'
import { searchLatLngRoute } from './search-lat-lng-route'

const routes: IRoutes = [
  { route: saveAnalyticsRoute, private: true },
  { route: getNvdiSummaryRoute, private: true },
  { route: getNvdiStatsRoute, private: true },
  { route: getAreaStatsRoute, private: true },
  { route: getAreaSummaryRoute, private: true },
  { route: getAllDataAnalyticsRoute, private: true },
  { route: getGeometryRoute, private: true },
  { route: getAnalytics, private: true },
  { route: searchLatLngRoute, private: true },
  { route: getHistogramAverageHistoryRoute, private: true },
  { route: getStatsOverviewRoute, private: true },
  { route: getLastAnalyticsRoute, private: true },
]

const analyticsPrefix = '/analytics'

export const analyticsRoutes = registerPrefix(routes, analyticsPrefix)
