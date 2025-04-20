export enum ContactAttackStatus {
    None, // no attack is being performed
    Init, // attack initialization status (before actual attack)
    Active, // attack is being performed
    End // attack deinitialization status
}