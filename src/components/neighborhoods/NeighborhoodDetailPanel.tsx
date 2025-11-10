'use client';

/**
 * Neighborhood Detail Panel Component
 *
 * Displays detailed information about a selected SF neighborhood including:
 * - Neighborhood name
 * - Median house and condo prices
 * - Price per square foot
 * - Walk and transit scores
 * - Descriptive text
 */

import React from 'react';
import { NeighborhoodStats } from './types';

interface NeighborhoodDetailPanelProps {
  /** Selected neighborhood name */
  selectedName?: string | null;
  /** Neighborhood statistics */
  stats?: NeighborhoodStats | null;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPricePerSqft(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function NeighborhoodDetailPanel({
  selectedName,
  stats,
}: NeighborhoodDetailPanelProps) {
  if (!selectedName || !stats) {
    return (
      <div className="w-full h-full min-h-[500px] p-8 bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            Select a Neighborhood
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Click on any neighborhood on the map to view detailed market statistics,
            pricing trends, and neighborhood insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] p-6 md:p-8 bg-white overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          {selectedName}
        </h2>
        <div className="h-1 w-20 bg-red-800 rounded"></div>
      </div>

      {/* Price Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* House Prices */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Single Family Home
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Median Sale Price</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(stats.medianHousePrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Price per Sq Ft</p>
              <p className="text-xl font-semibold text-slate-700">
                {formatPricePerSqft(stats.housePricePerSqft)}
              </p>
            </div>
          </div>
        </div>

        {/* Condo Prices */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            2BR/2BA Condo
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Median Sale Price</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(stats.medianCondoPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Price per Sq Ft</p>
              <p className="text-xl font-semibold text-slate-700">
                {formatPricePerSqft(stats.condoPricePerSqft)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scores */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
          Walkability & Transit
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-xl font-bold text-green-800">
                {stats.walkScore}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Walk Score</p>
              <p className="text-sm font-medium text-slate-700">Very Walkable</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-bold text-blue-800">
                {stats.transitScore}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Transit Score</p>
              <p className="text-sm font-medium text-slate-700">Excellent Transit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
          About {selectedName}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {stats.description}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 italic">
          Note: These are representative market statistics. Contact us for current
          listings and detailed neighborhood analysis tailored to your needs.
        </p>
      </div>
    </div>
  );
}
