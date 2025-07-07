import Papa from 'papaparse';

export interface UFCFighterTOTT {
  FIGHTER: string;
  HEIGHT: string;
  WEIGHT: string;
  REACH: string;
  STANCE: string;
  DOB: string;
  URL: string;
}

export interface ProcessedFighterData {
  id: string;
  name: string;
  nickname?: string;
  age: number;
  height: string;
  weight: string;
  reach: string;
  stance: string;
  record: {
    total: number;
    wins: number;
    losses: number;
    draws: number;
    ko: number;
  };
  stats: {
    strikingAccuracy: number;
    strikesLandedPerMin: number;
    strikesAbsorbedPerMin: number;
    takedownAccuracy: number;
    takedownDefense: number;
    submissionAverage: number;
  };
  recentFights: Array<{
    opponent: string;
    date: string;
    result: 'Win' | 'Loss' | 'Draw';
    method: string;
  }>;
}

export class CSVDataProcessor {
  private fighterTOTTData: UFCFighterTOTT[] = [];
  
  async loadFighterTOTTData(): Promise<void> {
    try {
      const response = await fetch('/scrape_ufc_stats/ufc_fighter_tott.csv');
      const csvText = await response.text();
      
      const result = Papa.parse<UFCFighterTOTT>(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string): string => header.trim()
      });
      
      this.fighterTOTTData = result.data.filter((row: UFCFighterTOTT) => row.FIGHTER && row.FIGHTER.trim() !== '');
    } catch (error) {
      console.error('Error loading fighter TOTT data:', error);
      throw error;
    }
  }

  private calculateAge(dobString: string): number {
    if (!dobString || dobString === '--') return 0;
    
    try {
      const dob = new Date(dobString);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      return age > 0 ? age : 0;
    } catch {
      return 0;
    }
  }

  private normalizeHeight(height: string): string {
    if (!height || height === '--') return 'N/A';
    return height.trim();
  }

  private normalizeWeight(weight: string): string {
    if (!weight || weight === '--') return 'N/A';
    return weight.trim();
  }

  private normalizeReach(reach: string): string {
    if (!reach || reach === '--') return 'N/A';
    return reach.trim();
  }

  private normalizeStance(stance: string): string {
    if (!stance || stance === '--') return 'N/A';
    return stance.trim();
  }

  private generatePlaceholderRecord() {
    return {
      total: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      ko: 0
    };
  }

  private generatePlaceholderStats() {
    return {
      strikingAccuracy: 0,
      strikesLandedPerMin: 0,
      strikesAbsorbedPerMin: 0,
      takedownAccuracy: 0,
      takedownDefense: 0,
      submissionAverage: 0
    };
  }

  getFighterByName(name: string): ProcessedFighterData | null {
    const fighterData = this.fighterTOTTData.find(
      fighter => fighter.FIGHTER.toLowerCase() === name.toLowerCase()
    );
    
    if (!fighterData) return null;

    const id = fighterData.FIGHTER.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    return {
      id,
      name: fighterData.FIGHTER,
      age: this.calculateAge(fighterData.DOB),
      height: this.normalizeHeight(fighterData.HEIGHT),
      weight: this.normalizeWeight(fighterData.WEIGHT),
      reach: this.normalizeReach(fighterData.REACH),
      stance: this.normalizeStance(fighterData.STANCE),
      record: this.generatePlaceholderRecord(),
      stats: this.generatePlaceholderStats(),
      recentFights: []
    };
  }

  getAllFighters(): ProcessedFighterData[] {
    return this.fighterTOTTData.map(fighterData => {
      const id = fighterData.FIGHTER.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      return {
        id,
        name: fighterData.FIGHTER,
        age: this.calculateAge(fighterData.DOB),
        height: this.normalizeHeight(fighterData.HEIGHT),
        weight: this.normalizeWeight(fighterData.WEIGHT),
        reach: this.normalizeReach(fighterData.REACH),
        stance: this.normalizeStance(fighterData.STANCE),
        record: this.generatePlaceholderRecord(),
        stats: this.generatePlaceholderStats(),
        recentFights: []
      };
    });
  }
}