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
  branches = ['All Branches', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'CDS', 'AIML', 'CS'];
  page: number = 1;
  isAddModalOpen: boolean = false;
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
    private memberService: MembersService
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
      member.name.toLowerCase().includes(term) ||
      member.pin_no.toLowerCase().includes(term) ||
      member.branch.toLowerCase().includes(term)
    );
  }

  scrollToTop() {
    setTimeout(() => {
      this.topElement?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  //add member
  openAddModal() {
    this.isAddModalOpen = true;
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
        this.loadMembers();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add member');
      }
    });
    console.log('Adding new member:', this.newMember);
    this.closeAddModal();
  }

  closeAddModal() {
    this.isAddModalOpen = false;
    this.newMember = {
      admission_id: 0,
      pin_no: '',
      name: '',
      degree: '',
      branch: '',
      year: 0,
      status: 'Active'
    };;
  }

  //update member
  openEditModal(member: Member): void {
    this.editedMember = { ...member }
    this.isEditModalOpen = true;
    console.log('Editing member:', this.editedMember);

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

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editedMember = { ...this.newMember };
    this.loadMembers();
  }


  //delete member
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

}