/**
 * StatsHeader Component
 * Displays high-level monthly metrics and trends.
 */
const StatsHeader = ({ stats, trend }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Average Occupancy */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg Occupancy</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{stats.averageOccupancy}%</h3>
          </div>
          {trend && (
            <div className={`flex items-center px-2 py-1 rounded text-[10px] font-bold ${trend.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </div>
          )}
        </div>
        <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
            style={{ width: `${stats.averageOccupancy}%` }}
          />
        </div>
      </div>

      {/* Total Revenue */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Est. Revenue</p>
        <h3 className="text-3xl font-extrabold text-white mt-1">
          ₹{stats.totalRevenue.toLocaleString('en-IN')}
        </h3>
        <p className="text-[10px] text-slate-500 mt-2 font-medium">Based on month check-ins</p>
      </div>

      {/* Room Nights */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Room-Nights Sold</p>
        <h3 className="text-3xl font-extrabold text-white mt-1">{stats.totalOccupiedRoomNights}</h3>
        <p className="text-[10px] text-slate-500 mt-2 font-medium">Total volume for the month</p>
      </div>
    </div>
  );
};

export default StatsHeader;
