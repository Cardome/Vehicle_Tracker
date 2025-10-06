import React, { useState, useMemo } from 'react';
import { Search, DollarSign, TrendingUp, Car, Calendar, Filter } from 'lucide-react';

const VehicleAcquisitionTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample data structure based on your spreadsheet
  const [vehicles] = useState([
    { id: 1, date: '9/2/2025', year: '2019', make: 'JEEP', model: 'GRAND CHEROKEE SRT', vin: '1C4RJFDJ9KC551524', mileage: 44500, dealer: 'UNDER THE BRIDGE', amount: 29200, status: 'Cleared', statusDate: '2025-09-02', aging: 33 },
    { id: 2, date: '9/4/2025', year: '2025', make: 'Chevrolet', model: 'Malibu', vin: '1G1ZD5STXSF118372', mileage: 12500, dealer: 'N&J AUTO SALES', amount: 14900, status: 'Cleared', statusDate: '2025-09-04', aging: 31 },
    { id: 3, date: '9/4/2025', year: '2023', make: 'Chevrolet', model: 'Traverse', vin: '1GNEVKKW7PJ167939', mileage: 4000, dealer: 'S&I AUTO SALES INC', amount: 26000, status: 'Cleared', statusDate: '2025-09-04', aging: 31 },
    { id: 4, date: '9/11/2025', year: '2023', make: 'Cadillac', model: 'XT4', vin: '1GYFZDR4GPF125772', mileage: 12500, dealer: 'TRUBLUE', amount: 20500, status: 'Pending', statusDate: '2025-09-11', aging: 24 },
  ]);

  const stats = useMemo(() => {
    const cleared = vehicles.filter(v => v.status === 'Cleared');
    const pending = vehicles.filter(v => v.status === 'Pending');
    const totalAmount = vehicles.reduce((sum, v) => sum + v.amount, 0);
    const avgAmount = totalAmount / vehicles.length;
    
    return {
      total: vehicles.length,
      cleared: cleared.length,
      pending: pending.length,
      totalAmount,
      avgAmount
    };
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(v => v.status.toLowerCase() === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.dealer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.vin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'aging') return a.aging - b.aging;
      return 0;
    });

    return filtered;
  }, [vehicles, searchTerm, statusFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Vehicle Acquisition Tracker</h1>
          <p className="text-slate-600">Manage and track your vehicle purchases</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Vehicles</p>
                <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
              </div>
              <Car className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Cleared</p>
                <p className="text-3xl font-bold text-slate-800">{stats.cleared}</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-slate-800">{stats.pending}</p>
              </div>
              <Calendar className="text-yellow-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-slate-800">${(stats.totalAmount / 1000).toFixed(0)}k</p>
              </div>
              <DollarSign className="text-purple-500" size={32} />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by make, model, dealer, or VIN..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 text-slate-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="cleared">Cleared</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <select
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="aging">Sort by Aging</option>
            </select>
          </div>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-sm text-slate-500">{vehicle.vin}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  vehicle.status === 'Cleared' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Purchase Date</p>
                  <p className="text-sm font-semibold text-slate-700">{vehicle.date}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Mileage</p>
                  <p className="text-sm font-semibold text-slate-700">{vehicle.mileage.toLocaleString()} mi</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Dealer</p>
                  <p className="text-sm font-semibold text-slate-700">{vehicle.dealer}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Aging</p>
                  <p className="text-sm font-semibold text-slate-700">{vehicle.aging} days</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Amount:</span>
                  <span className="text-2xl font-bold text-slate-800">${vehicle.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-slate-500 text-lg">No vehicles found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleAcquisitionTracker;