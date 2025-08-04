import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Member } from 'src/app/models/members.model';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  filteredMembers: Member[] = [];

  searchTerm = '';
  selectedBranch = 'All Branches';
  branches = ['All Branches', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL']; // Example branches

  page: number = 1;
  showAddForm = false;
  isEditModalOpen = false;
  editIndex: number | null = null;

  newMember: Member = {
    admission_id: 0,
    pin_no: '',
    name: '',
    degree: '',
    branch: '',
    year: 1,
    status: 'Active',
  };

  @ViewChild('top') topElement!: ElementRef;


  @Input() editedMember: Member = {
    admission_id: 0,
    pin_no: '',
    name: '',
    degree: '',
    branch: '',
    year: 0,
    status: '',
  };

  message = '';

  constructor(
    private memberService: MembersService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe((data) => {
      this.members = data;
      this.applyFilters();
    });
  }
  updateMember(): void {
    this.message = '';

    this.memberService
      .update(this.editedMember.admission_id, this.editedMember)
      .subscribe({

        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This data was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  onSearchChange(): void {
    this.applyFilters();
  }

  onBranchChange(): void {
    if (this.selectedBranch === 'All Branches') {
      this.filteredMembers = [...this.members];
    } else {
      this.filteredMembers = this.members.filter(
        m => m.branch.toLowerCase() === this.selectedBranch.toLowerCase()
      );
    }
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredMembers = this.members.filter(member =>
      member.branch.toLowerCase().includes(term)
    );
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  scrollToTop() {
    setTimeout(() => {
      this.topElement?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  submitForm() {
    this.memberService.addMember(this.newMember).subscribe({
      next: () => {
        alert('Member added successfully!');
        this.newMember = {
          admission_id: 0,
          pin_no: '',
          name: '',
          degree: '',
          branch: '',
          year: 1,
          status: 'Active',
        };
        this.showAddForm = false;
        this.loadMembers(); // reload
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add member');
      }
    });
  }

  deleteMember(id: number): void {
    if (confirm('Are you sure you want to delete this member?')) {
      this.memberService.deleteMember(id).subscribe(() => {
        this.members = this.members.filter(m => {
          return m.admission_id !== id
        });
        this.applyFilters();
      });
    }
  }

  openEditModal(index: number): void {
    this.editIndex = index;
    this.editedMember = { ...this.members[index] };
    this.isEditModalOpen = true;
    console.log('Editing member:', this.editedMember);

  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editedMember = { ...this.newMember };
  }

}